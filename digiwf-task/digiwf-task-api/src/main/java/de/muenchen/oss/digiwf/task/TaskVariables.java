package de.muenchen.oss.digiwf.task;

import io.holunda.camunda.bpm.data.factory.VariableFactory;

import java.util.List;

import static io.holunda.camunda.bpm.data.CamundaBpmData.*;

/**
 * Definition of task variables.
 */
public class TaskVariables {
    /**
     * Task variable containing the JSON schema for the task.
     */
    public static final VariableFactory<String> TASK_SCHEMA_KEY = stringVariable("app_task_schema_key");

    /**
     * Task variable containing the assignee of the task.
     */
    public static final VariableFactory<String> TASK_ASSIGNEE = stringVariable("app_task_assignee");
    /**
     * Task variable containing the candidate users of the task.
     */
    public static final VariableFactory<List<String>> TASK_CANDIDATE_USERS = listVariable("app_task_candidate_users", String.class);
    /**
     * Task variable containing the candidate groups of the task.
     */
    public static final VariableFactory<List<String>> TASK_CANDIDATE_GROUPS = listVariable("app_task_candidate_groups", String.class);
    /**
     * Task variable containing override for candidate groups notification addresses.
     */
    public static final VariableFactory<String> NOTIFICATION_CANDIDATE_GROUPS_ADDRESSES = stringVariable("app_notification_candidate_groups_addresses");

    /**
     * Flag indicating if the task is cancellable.
     */
    public static final VariableFactory<Boolean> TASK_CANCELABLE = booleanVariable("app_task_cancelable");

    /**
     * Reflects the type of the schema used in task.
     */
    public static final VariableFactory<TaskSchemaType> TASK_SCHEMA_TYPE = customVariable("app_task_schema_type", TaskSchemaType.class);

    /**
     * Reflects the task description.
     */
    public static final VariableFactory<String> TASK_DESCRIPTION = stringVariable("app_task_description");
    /**
     * Reflects the task description.
     */
    public static final VariableFactory<String> TASK_TAG = stringVariable("app_task_tag");
    /**
     * Reflects the task description.
     */
    public static final VariableFactory<String> TASK_DESCRIPTION_LEGACY = stringVariable("digitalwf_task_description");

    /**
     * Task variable containing the process file context of the task.
     */
    public static final VariableFactory<String> PROCESS_FILE_CONTEXT = stringVariable("app_file_context");

    /**
     * Task variable containing the process async config of the task.
     */
    public static final VariableFactory<String> PROCESS_ASYNC_CONFIG = stringVariable("app_file_s3_async_config");

    /**
     * Task variable containing the process sync config of the task.
     */
    public static final VariableFactory<String> PROCESS_SYNC_CONFIG = stringVariable("app_file_s3_sync_config");

    /**
     * Task variable containing the editable paths of the task.
     */
    public static final VariableFactory<String> FILE_PATHS = stringVariable("app_file_paths");

    /**
     * Task variable containing the readonly file paths of the task.
     */
    public static final VariableFactory<String> FILE_PATHS_READONLY = stringVariable("app_file_paths_readonly");

    /**
     * Task variable containing the customized mail subject of the task.
     */
    public static final VariableFactory<String> MAIL_SUBJECT = stringVariable("mail_subject");

    /**
     * Task variable containing the customized mail body of the task.
     */
    public static final VariableFactory<String> MAIL_BODY = stringVariable("mail_body");

    /**
     * Task variable containing the customized mail bottom text of the task.
     */
    public static final VariableFactory<String> MAIL_BOTTOM_TEXT = stringVariable("mail_bottom_text");

    public static final VariableFactory<List<TaskExternalReference>> TASK_EXTERNAL_LINKS = listVariable("app_task_external_links", TaskExternalReference.class);

}
