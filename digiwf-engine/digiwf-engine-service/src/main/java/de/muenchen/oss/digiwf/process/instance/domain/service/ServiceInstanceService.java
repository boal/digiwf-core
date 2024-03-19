/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik der Landeshauptstadt München, 2020
 */

package de.muenchen.oss.digiwf.process.instance.domain.service;

import de.muenchen.oss.digiwf.jsonschema.domain.model.JsonSchema;
import de.muenchen.oss.digiwf.jsonschema.domain.service.JsonSchemaService;
import de.muenchen.oss.digiwf.process.config.domain.service.ProcessConfigService;
import de.muenchen.oss.digiwf.process.instance.domain.mapper.HistoryTaskMapper;
import de.muenchen.oss.digiwf.process.instance.domain.mapper.ServiceInstanceMapper;
import de.muenchen.oss.digiwf.process.instance.domain.model.ServiceInstance;
import de.muenchen.oss.digiwf.process.instance.domain.model.ServiceInstanceDetail;
import de.muenchen.oss.digiwf.process.instance.infrastructure.entity.ServiceInstanceEntity;
import de.muenchen.oss.digiwf.process.instance.infrastructure.repository.ProcessInstanceInfoRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.camunda.bpm.engine.HistoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.history.HistoricProcessInstance;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Service to interact with process instances.
 *
 * @author externer.dl.horn
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ServiceInstanceService {

    private final HistoryService historyService;

    private final ProcessConfigService processConfigService;
    private final ServiceInstanceAuthService serviceInstanceAuthService;
    private final RuntimeService runtimeService;

    private final ProcessInstanceInfoRepository processInstanceInfoRepository;

    private final ServiceInstanceMapper serviceInstanceMapper;
    private final HistoryTaskMapper historyTaskMapper;

    private final JsonSchemaService jsonSchemaService;
    private final ServiceInstanceDataService serviceInstanceDataService;


    /**
     * Get all assigned  instances
     *
     * @return assigned  instances
     */
    public Page<ServiceInstance> getProcessInstanceByUser(
            final String userId,
            final int page,
            final int size,
            @Nullable final String query
    ) {
        final Pageable pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC,"startTime"));
        if (query == null || query.isBlank()) {
            return processInstanceInfoRepository.findAllByUserId(userId, pageRequest)
                    .map(this.serviceInstanceMapper::map2Model);
        }
        return processInstanceInfoRepository.searchAllByUserId(query.toLowerCase(), userId, pageRequest)
                .map(this.serviceInstanceMapper::map2Model);
    }

    /**
     * Get detail information of an instance.
     *
     * @param infoId id of the  instance
     * @return instance detail
     */
    public ServiceInstanceDetail getServiceInstanceDetail(final String infoId) {

        final ServiceInstance processInstanceInfo = this.getServiceInstanceById(infoId).orElseThrow();

        val processConfig = this.processConfigService.getProcessConfig(processInstanceInfo.getDefinitionKey()).orElseThrow();
        val tasks = this.historyService.createHistoricTaskInstanceQuery()
                .processInstanceId(processInstanceInfo.getInstanceId())
                .list();

        final ServiceInstanceDetail detail = this.serviceInstanceMapper.map2Detail(processInstanceInfo);
        detail.setConfig(processConfig);
        detail.setHistoryTasks(this.historyTaskMapper.map2Model(tasks));

        if (StringUtils.isNotBlank(processConfig.getInstanceSchemaKey())) {
            final JsonSchema jsonSchema = this.jsonSchemaService.getByKey(processConfig.getInstanceSchemaKey()).orElseThrow();
            final Map<String, Object> data = this.serviceInstanceDataService.getVariables(processInstanceInfo.getInstanceId(), jsonSchema);

            detail.setData(data);
            detail.setJsonSchema(jsonSchema.getSchemaMap());
        }

        return detail;
    }

    public ServiceInstance getRootProcessInstance(final String instanceId) {
        final ProcessInstance instance = this.runtimeService.createProcessInstanceQuery()
                .processInstanceId(instanceId)
                .singleResult();
        if (instance == null) {
            throw new IllegalArgumentException("No process instance found for id: " + instanceId);
        }

        return this.processInstanceInfoRepository.findByInstanceId(instance.getRootProcessInstanceId())
                .map(this.serviceInstanceMapper::map2Model)
                .or(() -> {
                    //TODO Remove after #545 is fixed
                    final HistoricProcessInstance historicProcessInstance = this.historyService.createHistoricProcessInstanceQuery()
                            .processInstanceId(instanceId)
                            .singleResult();

                    if (historicProcessInstance == null) {
                        throw new IllegalArgumentException("No process instance found for id: " + instanceId);
                    }
                    return Optional.of(new ServiceInstance(
                            null, // Camunda Only Process without DigiWF-Instance-Info
                            instance.getRootProcessInstanceId(),
                            historicProcessInstance.getProcessDefinitionName(),
                            historicProcessInstance.getProcessDefinitionKey(),
                            historicProcessInstance.getStartTime(),
                            historicProcessInstance.getEndTime(),
                            historicProcessInstance.getRemovalTime(),
                            //No Status/Description on non DigiWF processes
                            null,
                            null,
                            null));
                }).orElseThrow();

    }

    /**
     * Get service instance by  id.
     *
     * @param id Id of the service instance
     * @return service instance
     */
    public Optional<ServiceInstance> getServiceInstanceById(final String id) {
        return this.processInstanceInfoRepository.findById(id)
                .map(this.serviceInstanceMapper::map2Model);
    }


    /**
     * Get service instance by instance id.
     *
     * @param instanceId Id of the instance
     * @return service instance
     */
    public Optional<ServiceInstance> getServiceInstanceByInstanceId(final String instanceId) {
        return this.processInstanceInfoRepository.findByInstanceId(instanceId)
                .map(this.serviceInstanceMapper::map2Model);
    }

    /**
     * Create a Service Instance object.
     *
     * @param definitionName name of the definition
     * @param definitionKey  key of the definition
     * @return created ServiceInstance
     */
    public ServiceInstance creatServiceInstance(final String definitionName, final String definitionKey) {
        final ServiceInstance serviceInstance = ServiceInstance.builder()
                .definitionName(definitionName)
                .startTime(new Date())
                .definitionKey(definitionKey)
                .status("Gestartet")
                .build();
        return this.saveServiceInstance(serviceInstance);
    }

    /**
     * Save an extisting service instance
     *
     * @param serviceInstance Instance that is saved
     * @return saved service instance
     */
    public ServiceInstance saveServiceInstance(final ServiceInstance serviceInstance) {
        final ServiceInstanceEntity persistedProcessInstanceInfo = this.processInstanceInfoRepository.save(this.serviceInstanceMapper.map2Entity(serviceInstance));
        return this.serviceInstanceMapper.map2Model(persistedProcessInstanceInfo);
    }

    /**
     * Create
     *
     * @param instanceId Id of the corresponding
     * @param userId     Id of the user
     */
    public void authorizeServiceInstance(final String instanceId, final String userId) {
        this.serviceInstanceAuthService.createAuthorization(instanceId, userId);
    }

    /**
     * Update the instance Id of a service instance
     *
     * @param serviceInstanceId Id of the service instance
     * @param instanceId        Id of the corresponding process instance
     */
    public void updateInstanceId(final String serviceInstanceId, final String instanceId) {
        final ServiceInstance serviceInstance = this.getServiceInstanceById(serviceInstanceId).orElseThrow();
        serviceInstance.updateProcessInstanceId(instanceId);
        this.saveServiceInstance(serviceInstance);
    }

    /**
     * Get all instances expired at a reference date.
     *
     * @param referenceDate the reference date for expiration
     * @return expired instances
     */
    public List<ServiceInstance> getProcessInstanceByRemovalTimeBefore(final Date referenceDate) {
        final List<ServiceInstanceEntity> instances = this.processInstanceInfoRepository.findByRemovalTimeBefore(referenceDate);
        return this.serviceInstanceMapper.map2Model(instances);
    }

    /**
     * Cleanup instance with given id.
     *
     * @param instanceId the id
     */
    public void cleanupInstance(final String instanceId) {
        final Optional<ServiceInstanceEntity> entity = this.processInstanceInfoRepository.findByInstanceId(instanceId);
        if (entity.isPresent()) {
            this.processInstanceInfoRepository.delete(entity.get());
            log.info("Service instance cleaned up: {}", entity.get().getInstanceId());
        }
    }
}
