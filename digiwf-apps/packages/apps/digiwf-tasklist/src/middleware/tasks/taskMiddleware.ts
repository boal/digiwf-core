import { PageOfTasks, Task } from "@muenchen/digiwf-task-api-internal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, inject, ref, Ref } from "vue";

import { ApiCallError } from "../../api/defaultErrorHandler";
import {
  callCancelTaskInTaskService,
  callCompleteTaskInTaskService,
  callDeferTask,
  callDownloadPdfFromEngine,
  callGetAssignedGroupTasksFromTaskService,
  callGetOpenGroupTasksFromTaskService,
  callGetTaskDetailsFromTaskService,
  callGetTasksFromTaskService,
  callPostAssignTaskInTaskService,
  callSaveTaskInTaskService,
} from "../../api/tasks/tasksApiCalls";
import { useStore } from "../../hooks/store";
import router from "../../router";
import store from "../../store";
import { nullToUndefined } from "../../utils/dataTransformations";
import { dateToIsoDateTime, getCurrentDate } from "../../utils/time";
import { Page } from "../commonModels";
import { queryClient } from "../queryClient";
import { getUserInfo, useCurrentUserInfo } from "../user/userMiddleware";
import { User } from "../user/userModels";
import {
  addAssignedTaskIds,
  addFinishedTaskIds,
  isInAssignedProcesses,
  isInFinishedProcesses,
} from "./mutatedTaskFilter";
import {
  mapTaskDetailsFromTaskService,
  mapTaskFromTaskService,
} from "./taskMapper";
import { HumanTask, HumanTaskDetails, TaskVariables } from "./tasksModels";

const extractTag = (tag: Ref<string | undefined>): string | undefined => {
  const currentValue = tag.value;
  if (currentValue === undefined) {
    return undefined;
  }
  return currentValue.trim().length === 0 ? undefined : currentValue;
};

const userTasksQueryId = "user-tasks";
const assignedGroupTasksQueryId = "assigned-group-tasks";
const openGroupTasksQueryId = "open-group-tasks";

export const invalidUserTasks = () =>
  queryClient.invalidateQueries([userTasksQueryId]);
const addUserToTask = (r: Task): Promise<HumanTask> => {
  return (
    r.assignee ? getUserInfo(r.assignee) : Promise.resolve(undefined)
  ).then((user) =>
    Promise.resolve(
      mapTaskFromTaskService(
        r,
        isInFinishedProcesses(r.id),
        isInAssignedProcesses(r.id),
        user
      )
    )
  );
};

const handlePageOfTaskResponse = (response: PageOfTasks) => {
  const tasksWithUserPromises = response.content?.map(addUserToTask) || [];
  return Promise.all<HumanTask>(tasksWithUserPromises).then((tasks) =>
    Promise.resolve<Page<HumanTask>>({
      content: tasks,
      totalElements: response.totalElements,
      totalPages: response.totalPages || 0,
      size: response.size,
      page: response.page,
    })
  );
};
export const useMyTasksQuery = (
  page: Ref<number>,
  size: Ref<number>,
  query: Ref<string | undefined>,
  tag: Ref<string | undefined>,
  shouldIgnoreFollowUp: Ref<boolean | undefined>,
  sort: Ref<string | undefined>
) =>
  useQuery({
    queryKey: [
      userTasksQueryId,
      page.value,
      size.value,
      query.value,
      tag.value,
      !shouldIgnoreFollowUp.value,
    ],

    queryFn: (): Promise<Page<HumanTask>> => {
      return callGetTasksFromTaskService(
        page.value,
        size.value,
        nullToUndefined(query.value),
        extractTag(tag),
        shouldIgnoreFollowUp.value ? undefined : getCurrentDate(),
        sort.value
      ).then(handlePageOfTaskResponse);
    },
  });

export const useOpenGroupTasksQuery = (
  page: Ref<number>,
  size: Ref<number>,
  query: Ref<string | undefined>,
  tag: Ref<string | undefined>,
  sort: Ref<string | undefined>
) =>
  useQuery({
    queryKey: [
      openGroupTasksQueryId,
      page.value,
      size.value,
      sort.value,
      query.value,
      tag.value,
    ],
    queryFn: (): Promise<Page<HumanTask>> => {
      return callGetOpenGroupTasksFromTaskService(
        page.value,
        size.value,
        sort.value,
        nullToUndefined(query.value),
        extractTag(tag)
      ).then(handlePageOfTaskResponse);
    },
  });

export const useAssignedGroupTasksQuery = (
  page: Ref<number>,
  size: Ref<number>,
  query: Ref<string | undefined>,
  tag: Ref<string | undefined>,
  assignee: Ref<string | undefined>,
  sort: Ref<string | undefined>
) =>
  useQuery({
    queryKey: [
      assignedGroupTasksQueryId,
      page.value,
      size.value,
      sort.value,
      query.value,
      tag.value,
      assignee.value,
    ],
    queryFn: (): Promise<Page<HumanTask>> => {
      return callGetAssignedGroupTasksFromTaskService(
        page.value,
        size.value,
        sort.value,
        nullToUndefined(query.value),
        extractTag(tag),
        nullToUndefined(assignee.value)
      ).then(handlePageOfTaskResponse);
    },
  });

export interface UseNumberOfTasksReturn {
  readonly myTasks: Ref<number>;
  readonly assignedGroupTasks: Ref<number>;
  readonly openGroupTasks: Ref<number>;
}

export const useNumberOfTasks = (): UseNumberOfTasksReturn => {
  const dummyPage = ref(0);
  const dummyPageSize = ref(20);
  const dummyQuery = ref(undefined);
  const dummyTag = ref(undefined);
  const { data: myTasksData } = useMyTasksQuery(
    dummyPage,
    dummyPageSize,
    dummyQuery,
    dummyTag,
    ref(false),
    ref(undefined)
  );
  const { data: assignGroupData } = useAssignedGroupTasksQuery(
    dummyPage,
    dummyPageSize,
    dummyQuery,
    dummyTag,
    ref(undefined),
    ref(undefined)
  );
  const { data: openGroupData } = useOpenGroupTasksQuery(
    dummyPage,
    dummyPageSize,
    dummyQuery,
    dummyTag,
    ref(undefined)
  );

  return {
    myTasks: computed(() => myTasksData?.value?.totalElements || 0),
    assignedGroupTasks: computed(
      () => assignGroupData?.value?.totalElements || 0
    ),
    openGroupTasks: computed(() => openGroupData?.value?.totalElements || 0),
  };
};

export const useAssignTaskToCurrentUserMutation = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUserInfo();

  return useMutation<void, any, string>({
    mutationFn: (taskId) => {
      if (currentUser.value?.lhmObjectId) {
        return callPostAssignTaskInTaskService(
          taskId,
          currentUser.value?.lhmObjectId
        );
      }
      return Promise.reject(
        "Nutzerinformationen könnten nicht gehalden werden"
      );
    },
    onSuccess: (_, taskId) => {
      addAssignedTaskIds(taskId);
      queryClient.invalidateQueries(["user-tasks"]);
      queryClient.invalidateQueries(["assigned-group-tasks"]);
      queryClient.invalidateQueries(["open-group-tasks"]);
    },
  });
};

export const useAssignTaskToUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, any, { taskId: string; userId: string }>({
    mutationFn: ({ taskId, userId }) =>
      callPostAssignTaskInTaskService(taskId, userId),
    onSuccess: (_, variables) => {
      addAssignedTaskIds(variables.taskId);
      queryClient.invalidateQueries(["user-tasks"]);
      queryClient.invalidateQueries(["assigned-group-tasks"]);
      queryClient.invalidateQueries(["open-group-tasks"]);
    },
  });
};

export interface LoadTaskResultData {
  readonly task: HumanTaskDetails;
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly model?: { [key: string]: object };

  /**
   * with moment.js formatted date
   */
  readonly followUpDate: string;

  /**
   * @deprecated only used for old forms
   */
  readonly cancelText: string;
  /**
   * @deprecated only used for old forms
   */
  readonly hasDownloadButton: boolean;
  /**
   * @deprecated only used for old forms
   */
  readonly downloadButtonText: string;
}

export interface LoadTaskResult {
  readonly data?: LoadTaskResultData;
  readonly error?: string;
}

export const loadTask = (taskId: string): Promise<LoadTaskResult> => {
  return callGetTaskDetailsFromTaskService(taskId)
    .then((taskResponse) => {
      return (
        taskResponse.assignee
          ? getUserInfo(taskResponse.assignee)
          : Promise.resolve<undefined>(undefined)
      ).then((user) => {
        const taskDetails = mapTaskDetailsFromTaskService(
          taskResponse,
          isInFinishedProcesses(taskId),
          isInAssignedProcesses(taskId),
          user
        );
        return Promise.resolve<LoadTaskResult>({
          data: {
            task: taskDetails,
            hasDownloadButton:
              taskDetails.form?.buttons?.statusPdf!.showButton || false,
            model: taskDetails.variables, // FIXME: I guess that is wrong
            followUpDate: taskDetails.followUpDate!,
            cancelText:
              taskDetails.form?.buttons?.cancel!.buttonText || "Task abbrechen",
            downloadButtonText:
              taskDetails.form?.buttons?.statusPdf!.buttonText || "",
          },
        });
      });
    })
    .catch((error: ApiCallError) => {
      if (error.status === 404) {
        return Promise.resolve({
          error:
            "Die Aufgabe oder der zugehörige Vorgang wurden bereits abgeschlossen. Die Aufgabe kann daher nicht mehr angezeigt oder bearbeitet werden.",
        });
      } else {
        return Promise.resolve({
          error: "Die Aufgabe konnte nicht geladen werden.",
        });
      }
    });
};

/**
 * requests for TaskDetailsView
 */

export interface CancelTaskResult {
  readonly isError: boolean;
  readonly errorMessage?: string;
}

/**
 * @deprecated
 * @param taskId
 */
export const cancelTask = (taskId: string): Promise<CancelTaskResult> => {
  return callCancelTaskInTaskService(taskId)
    .then(() => {
      queryClient.invalidateQueries([userTasksQueryId]);
      router.push({ path: "/task" });

      return Promise.resolve<CancelTaskResult>({
        isError: false,
      });
    })
    .catch(() => {
      return Promise.resolve<CancelTaskResult>({
        isError: true,
        errorMessage: "Die Aufgabe konnte nicht abgebrochen werden.",
      });
    });
};

interface CompleteTaskResult {
  readonly errorMessage?: string;
  readonly isError: boolean;
}

export const completeTask = (
  taskId: string,
  variables: TaskVariables
): Promise<CompleteTaskResult> => {
  return callCompleteTaskInTaskService(taskId, variables)
    .then(() => {
      addFinishedTaskIds(taskId);
      invalidUserTasks();
      return Promise.resolve<CompleteTaskResult>({
        isError: false,
        errorMessage: undefined,
      });
    })
    .catch((error) => {
      return Promise.resolve<CompleteTaskResult>({
        isError: true,
        errorMessage: error.message,
      });
    });
};

interface SetFollowUpResult {
  readonly errorMessage?: string;
  readonly isError: boolean;
}

export const deferTask = (
  taskId: string,
  followUp: string
): Promise<SetFollowUpResult> => {
  return handleDeferTaskInTaskService(taskId, followUp)
    .then(() => {
      invalidUserTasks();
      router.push({ path: "/task" });

      return Promise.resolve<SetFollowUpResult>({
        errorMessage: undefined,
        isError: false,
      });
    })
    .catch((error) => {
      return Promise.resolve<SetFollowUpResult>({
        errorMessage:
          error.message === "incorrect date format"
            ? "Ungültiges Format für das Wiedervorlagedatum angegeben"
            : "Die Aufgabe konnte nicht gespeichert werden.",
        isError: true,
      });
    });
};

const handleDeferTaskInTaskService = (taskId: string, followUp: string) => {
  let date: string | undefined = undefined;
  try {
    date = dateToIsoDateTime(followUp);
  } catch (e: any) {
    return Promise.reject(e);
  }
  return callDeferTask(taskId, date);
};

interface SaveTaskResult {
  readonly errorMessage?: string;
  readonly isError: boolean;
}

export const saveTask = (
  taskId: string,
  variables: TaskVariables
): Promise<SaveTaskResult> => {
  return callSaveTaskInTaskService(taskId, variables)
    .then(() =>
      Promise.resolve({
        // FIXME: invalide task list?
        isError: false,
        errorMessage: undefined,
      })
    )
    .catch((error) =>
      Promise.resolve({
        isError: true,
        errorMessage: error.message,
      })
    );
};

interface AssignTaskResult {
  readonly isError: boolean;
}

export const assignTask = (
  taskId: string,
  userId: string
): Promise<AssignTaskResult> => {
  return callPostAssignTaskInTaskService(taskId, userId)
    .then(() => {
      router.push({ path: "/task/" + taskId });
      invalidUserTasks();
      queryClient.invalidateQueries([openGroupTasksQueryId]);
      queryClient.invalidateQueries([assignedGroupTasksQueryId]);
      return Promise.resolve({ isError: false });
    })
    .catch(() => Promise.resolve({ isError: true }));
};

interface DownloadPdfResult {
  readonly errorMessage?: string;
  readonly isError: boolean;
}

export const downloadPDFFromEngine = (
  taskId: string
): Promise<DownloadPdfResult> => {
  return callDownloadPdfFromEngine(taskId)
    .then((result) => {
      const fileURL = window.URL.createObjectURL(
        new Blob([base64ToArrayBuffer(result.data as any)], {
          type: "application/pdf",
        })
      );
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "statusdokument.pdf");
      document.body.appendChild(fileLink);
      fileLink.click();
      return Promise.resolve({
        isError: false,
        errorMessage: undefined,
      });
    })
    .catch((_) => {
      return Promise.resolve({
        isError: true,
        errorMessage: "Das Statusdokument konnte nicht erstellt werden.",
      });
    });
};

const base64ToArrayBuffer = (base64: string): Uint8Array => {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};
