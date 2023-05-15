package io.muenchendigital.digiwf.task.service.adapter.out.engine;

import io.muenchendigital.digiwf.task.service.application.port.out.engine.TaskCommandPort;
import org.camunda.bpm.engine.TaskService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

import static io.muenchendigital.digiwf.task.BpmnErrors.DEFAULT_TASK_CANCELLATION_ERROR;

/**
 * Encapsulation of the Camunda remote client.
 */
@Component
public class RemoteTaskCommandRestAdapter implements TaskCommandPort {
  private final TaskService taskService;

  public RemoteTaskCommandRestAdapter(@Qualifier("remote") TaskService taskService) {
    this.taskService = taskService;
  }

  @Override
  public void completeUserTask(String taskId, Map<String, Object> variables) {
    taskService.complete(taskId, variables);
  }

  @Override
  public void saveUserTask(String taskId, Map<String, Object> payload) {
    taskService.setVariables(taskId, payload);
  }

  @Override
  public void assignUserTask(String taskId, String assignee) {
    // TODO: will be switched to polyflow assignment
    taskService.setAssignee(taskId, assignee);
  }

  @Override
  public void unassignUserTask(String taskId) {
    taskService.setAssignee(taskId, null);
  }

  @Override
  public void deferUserTask(String taskId, Instant followUpDate) {
    var task = taskService.createTaskQuery().taskId(taskId).singleResult();
    if (task != null) {
      task.setDueDate(Date.from(followUpDate.truncatedTo(ChronoUnit.DAYS)));
      taskService.saveTask(task);
    }
  }

  @Override
  public void undeferUserTask(String taskId) {
    var task = taskService.createTaskQuery().taskId(taskId).singleResult();
    if (task != null) {
      task.setDueDate(null);
      taskService.saveTask(task);
    }
  }

  @Override
  public void cancelUserTask(String taskId) {
    taskService.handleBpmnError(taskId, DEFAULT_TASK_CANCELLATION_ERROR);
  }
}
