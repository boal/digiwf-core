package de.muenchen.oss.digiwf.process.definition.domain.service;

import de.muenchen.oss.digiwf.engine.mapper.EngineDataMapper;
import de.muenchen.oss.digiwf.json.serialization.JsonSerializationService;
import de.muenchen.oss.digiwf.json.validation.JsonSchemaValidator;
import de.muenchen.oss.digiwf.legacy.form.domain.service.FormService;
import de.muenchen.oss.digiwf.legacy.shared.data.DataService;
import de.muenchen.oss.digiwf.process.config.domain.model.ProcessConfig;
import de.muenchen.oss.digiwf.process.config.domain.service.ProcessConfigService;
import de.muenchen.oss.digiwf.process.definition.domain.model.ServiceDefinitionDetail;
import de.muenchen.oss.digiwf.shared.exception.VariablesNotValidException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ServiceDefinitionDataService {

    private final ProcessConfigService processConfigService;

    private final EngineDataMapper engineDataMapper;

    private final JsonSchemaValidator validationService;
    private final JsonSerializationService serializationService;

    private final DataService dataService;
    private final FormService formService;

    public Map<String, Object> serializeVariables(final ServiceDefinitionDetail definition, final Map<String, Object> variables) {

        final Map<String, Object> serializedVariables;

        if (Optional.ofNullable(definition.getStartForm()).isPresent()) {

            final boolean ignoreFields = this.processConfigService.getProcessConfig(definition.getKey())
                    .map(ProcessConfig::isIgnoreFieldsOnStart)
                    .orElse(false);

            //are variables valid?
            if (!ignoreFields && !this.formService.validateVariables(definition.getStartForm().getKey(), variables)) {
                throw new VariablesNotValidException("Not allowed");
            }

            final Map<String, Object> filteredVariables = this.dataService.filterReadonly(definition.getStartForm(), variables);

            //TODO remove business key in old data mapping
            serializedVariables = this.dataService.serializeVariables(definition.getStartForm(), filteredVariables);
        } else if (Optional.ofNullable(definition.getJsonSchema()).isPresent()) {
            serializedVariables = this.initalizeData(definition, variables);
        } else {
            throw new IllegalArgumentException("No json schema or start form available for service definition " + definition.getKey());
        }
        return serializedVariables;
    }

    private Map<String, Object> initalizeData(final ServiceDefinitionDetail definition, final Map<String, Object> variables) {
        //1. filter readonly data
        final JSONObject filteredData = this.serializationService.filter(definition.getJsonSchema(), variables, true);
        //2. validate data
        this.validationService.validate(definition.getJsonSchema(), filteredData.toMap());
        //3. simulate previous data for merging and removing JSON.null values
        final JSONObject previousData = this.serializationService.initialize(new JSONObject(definition.getJsonSchema()).toString());
        final Map<String, Object> clearedData = this.serializationService.merge(filteredData, previousData);
        //5. map to engine data and return
        return this.engineDataMapper.mapObjectsToVariables(clearedData);
    }

}
