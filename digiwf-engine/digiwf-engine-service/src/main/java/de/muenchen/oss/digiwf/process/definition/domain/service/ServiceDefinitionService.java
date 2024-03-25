/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik der Landeshauptstadt München, 2020
 */

package de.muenchen.oss.digiwf.process.definition.domain.service;

import de.muenchen.oss.digiwf.process.definition.domain.mapper.ServiceDefinitionMapper;
import de.muenchen.oss.digiwf.process.definition.domain.model.ServiceDefinition;
import de.muenchen.oss.digiwf.process.definition.domain.model.ServiceDefinitionDetail;
import de.muenchen.oss.digiwf.process.definition.domain.model.StartContext;
import de.muenchen.oss.digiwf.process.instance.domain.service.ServiceInstanceService;
import de.muenchen.oss.digiwf.process.instance.process.ProcessConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Service to query service definitions.
 *
 * @author externer.dl.horn
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ServiceDefinitionService {

    private final RepositoryService repositoryService;
    private final RuntimeService runtimeService;

    private final ServiceDefinitionMapper serviceDefinitionMapper;
    private final ServiceInstanceService serviceInstanceService;

    /**
     * Start a service definition with the given parameters.
     *
     * @param detail       service definition
     * @param variables    data with which the process is started
     * @param userId       id of the user that starts the process
     * @param startContext start context
     */
    public void startInstance(final ServiceDefinitionDetail detail, final String businessKey, final Map<String, Object> variables, final String userId, final StartContext startContext) {
        log.debug("Start Process: " + detail.getKey());

        //add variables
        variables.put(ProcessConstants.PROCESS_STARTER_OF_INSTANCE, userId);
        variables.put(ProcessConstants.PROCESS_FILE_CONTEXT, startContext.getFileContext());

        //start instance
        ProcessInstance processInstance;
        if (StringUtils.isEmpty(businessKey)) {
            processInstance = this.runtimeService.startProcessInstanceByKey(detail.getKey(), variables);
        } else {
            processInstance = this.runtimeService.startProcessInstanceByKey(detail.getKey(), businessKey, variables);
        }

        log.info("process instance for key {} started: {}", detail.getKey(), processInstance.getId());
    }

    /**
     * Get a service definition by id.
     *
     * @param id Id of the service definition
     * @return service definition
     */
    public ProcessDefinition getServiceDefinition(final String id) {
        final ProcessDefinition serviceDefinition = this.repositoryService.createProcessDefinitionQuery()
                .processDefinitionId(id)
                .singleResult();

        if (serviceDefinition == null) {
            throw new IllegalArgumentException(String.format("The servicedefinition with the id %s is not available.", id));
        }
        return serviceDefinition;
    }


    /**
     * Get all service definitions.
     *
     * @return all service definitions
     */
    public List<ServiceDefinition> getServiceDefinitions() {
        final List<ProcessDefinition> serviceDefinitions = this.repositoryService.createProcessDefinitionQuery()
                .startableInTasklist()
                .active()
                .latestVersion()
                .list();
        return this.serviceDefinitionMapper.map(serviceDefinitions);
    }

    /**
     * Get a service definition.
     * Does a check if the given authentication can access the service.
     *
     * @param key    key of the service definition
     * @param userId id of the user
     * @param groups groups of the user
     * @return service definition detail
     */
    public ServiceDefinitionDetail getServiceDefinitionDetail(final String key, final String userId, final List<String> groups) {

        final ProcessDefinition processDefinition = this.repositoryService.createProcessDefinitionQuery()
                .latestVersion()
                .processDefinitionKey(key)
                .singleResult();

        return this.serviceDefinitionMapper.map(processDefinition);
    }

}
