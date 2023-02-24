import { CreateIssue, IssueComment, PreviewIssue } from '@/interfaces/Issue.interface';
/* eslint-disable */
import { usersData, projectsData, issuesData, recentIssuesData, projectsBoards } from './sql-data';

interface GetParams<T> {
  params: T;
}

const addUsersToProjects = (projects: any[]) => {
  const newProjects: any[] = [];

  projects.forEach((project) => {
    const copyProject = JSON.parse(JSON.stringify(project));

    copyProject.users = copyProject.users.map((userId: number) => {
      return usersData.find((user) => user.id === userId);
    });

    newProjects.push(copyProject);
  });

  return newProjects;
};

const getCurrentDate = () => {
  const date = new Date();
  return date.getDate() + ', ' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};

const getIssues = (options: GetParams<{ name: string }>) => {
  return {
    status: 200,
    data: transformToPreviewIssue(JSON.parse(
      JSON.stringify(issuesData.filter((issue) => issue.name.toLowerCase().includes(options.params.name.toLowerCase())))
    )),
  };
};

const getProjects = (options: GetParams<{ projectIds: number[] }>) => {
  return {
    status: 200,
    data: addUsersToProjects(projectsData.filter((project) => options.params.projectIds.includes(project.id))),
  };
};

const getProjectBoard = (options: GetParams<{ projectKey: string }>) => {
  const project = projectsData.find((project) => project.key === options.params.projectKey);
  const projectBoard = JSON.parse(JSON.stringify(projectsBoards.find((projectBoard) => projectBoard.id === project?.id) ?? ''));

  projectBoard?.columns.forEach((column: any) => {
    column.issues = column.issues.map((issueData: any) => {
      return issuesData.find((issue) => issue.id === issueData.id);
    });

    column.issues = column.issues.filter((issue: any) => issue);
  });

  return {
    status: 200,
    data: projectBoard ?? [],
  };
};

const getProjectIssues = (options: GetParams<{ projectId: number }>) => {
  const findedProject = projectsData.find((project) => project.id === options.params.projectId);

  return {
    status: 200,
    data: JSON.parse(JSON.stringify(issuesData.filter((issue) => issue.project === findedProject?.key))),
  };
};

const transformToPreviewIssue = (issues: any[]): PreviewIssue[] => {
  return issues.map((issue: any) => {
    const projectName = projectsData.find((project) => project.key === issue.project)?.name;

    return {
      id: issue.id,
      isPreview: true,
      name: issue.name,
      assignees: issue.assignees,
      projectKey: issue.project,
      projectName: projectName ?? '',
      key: issue.key,
      type: issue.type, 
    }
  })
};

const getRecentIssues = () => {
  return {
    status: 200,
    data: {
      workedon: transformToPreviewIssue(JSON.parse(
        JSON.stringify(issuesData.filter((issue) => recentIssuesData.recentInProgress.includes(issue.id)))
      )),
      toDo: transformToPreviewIssue(JSON.parse(JSON.stringify(issuesData.filter((issue) => recentIssuesData.toDo.includes(issue.id))))),
      viewed: transformToPreviewIssue(JSON.parse(JSON.stringify(issuesData.filter((issue) => recentIssuesData.viewed.includes(issue.id))))),
    },
  };
};

const getFullIssueInfo = (options: GetParams<{ id: number; projectKey: string }>) => {
  const issueInfo = JSON.parse(
    JSON.stringify(
      issuesData.find((issue) => {
        return issue.id === options.params.id && issue.project === options.params.projectKey;
      })
    )
  );

  return {
    status: 200,
    data: issueInfo,
  };
};

const updateProject = (options: any) => {
  const updatingProject = projectsData.find((project) => project.id === options.id);

  if (updatingProject) {
    Object.assign(updatingProject, {
      ...options,
      updated: getCurrentDate(),
    });
  }

  return {
    status: 204,
    data: addUsersToProjects([JSON.parse(JSON.stringify(updatingProject))])[0],
  };
};

const updateIssue = (options: { id: number; [key: string]: any }) => {
  const updatingIssue = issuesData.find((issue) => issue.id === options.id);

  if (updatingIssue) {
    Object.assign(updatingIssue, {
      ...options,
      updated: getCurrentDate(),
    });
  }

  return {
    status: 204,
    data: {
      ...options,
      updated: updatingIssue?.updated,
    },
  };
};

const removeIssue = (options: GetParams<{ id: number }>) => {
  const removingIssueId = issuesData.findIndex((issue) => issue.id === options.params.id);
  const removingIssue = issuesData[removingIssueId];

  if (removingIssue && removingIssueId !== undefined) {
    issuesData.splice(removingIssueId, 1);
  }

  return {
    status: 200,
    data: null,
  };
};

const createComment = (options: { id: number; comment: string }) => {
  const issueById = issuesData.find((issue) => issue.id === options.id);

  const createdComment: IssueComment = {
    id: Math.floor(Math.random() * Math.random() * 50),
    userId: 1,
    author: 'Vladimir',
    html: options.comment,
    created: getCurrentDate(),
    updated: getCurrentDate(),
  };

  issueById?.comments.push(createdComment);

  return {
    status: 201,
    data: JSON.parse(JSON.stringify(createdComment)),
  };
};

const createIssue = (options: CreateIssue) => {
  const findedProject = projectsData.find((project) => project.key === options.projectKey);
  const generatedId = Math.floor(issuesData.length * Math.random() * 100);
  const createdIssue = {
    id: generatedId,
    project: options.projectKey as string,
    name: options.title,
    status: findedProject?.statuses[0] as string,
    type: options.issueType,
    key: `MP-${generatedId}`,
    comments: [],
    priority: 'medium',
    description: options.description,
    isDetails: true,
    assignees: JSON.parse(JSON.stringify(options.assignees)),
    reporters: JSON.parse(JSON.stringify(options.reporters)),
    created: getCurrentDate(),
    updated: getCurrentDate(),
  };

  const issueStatus = findedProject?.statuses[0] ?? 'Backlog';
  projectsBoards[0].columns.find((column) => column.name === issueStatus)?.issues.push({ id: generatedId, order: generatedId});

  issuesData.push(createdIssue);

  return {
    status: 201,
    data: JSON.parse(JSON.stringify(createdIssue)),
  };
};

const processGetMethod = (url: string, options: any) => {
  switch (url) {
    case '/issues/search':
      return getIssues(options);
    case '/issues/project':
      return getProjectIssues(options);
    case '/issues/recently':
      return getRecentIssues();
    case '/issues/details':
      return getFullIssueInfo(options);
    case '/projects':
      return getProjects(options);
    case '/projects/board':
      return getProjectBoard(options);
    default:
      return null;
  }
};

const processPatchMethod = (url: string, options: any) => {
  switch (url) {
    case '/issues':
      return updateIssue(options);
    case '/projects':
      return updateProject(options);
    default:
      return null;
  }
};

const processDeleteMethod = (url: string, options: any) => {
  switch (url) {
    case '/issues':
      return removeIssue(options);
    default:
      return null;
  }
};

const processPostMethod = (url: string, options: any) => {
  switch (url) {
    case '/comments':
      return createComment(options);
    case '/issues/create':
      return createIssue(options);
    default:
      return null;
  }
};

const fakeFetch = (method: string, url: string, options: any) => {
  return new Promise((resolve) => {
    let delay;

    switch (method) {
      case 'get':
        delay = 550;
        break;
      case 'delete':
        delay = 700;
        break;
      case 'post':
        delay = 600;
        break;
      default:
        delay = 0;
        break;
    }

    if (method === 'patch' && url === '/projects') {
      delay = 550;
    }

    setTimeout(() => {
      let data;

      switch (method) {
        case 'get':
          data = processGetMethod(url, options);
          break;
        case 'patch':
          data = processPatchMethod(url, options);
          break;
        case 'delete':
          data = processDeleteMethod(url, options);
          break;
        case 'post':
          data = processPostMethod(url, options);
          break;
        default:
          data = null;
      }

      resolve(data);
    }, delay);
  });
};

export default fakeFetch;
