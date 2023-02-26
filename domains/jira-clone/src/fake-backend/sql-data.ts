const projectsBoards = [
  {
    id: 1,
    columns: [
      {
        id: 0,
        name: 'Backlog',
        issues: [
          {
            id: 1,
            order: 1,
          },
          {
            id: 2,
            order: 2,
          },
          {
            id: 3,
            order: 3,
          },
          {
            id: 4,
            order: 4,
          },
        ],
      },
      {
        id: 1,
        name: 'In progress',
        issues: [
          {
            id: 5,
            order: 1,
          },
          {
            id: 6,
            order: 2,
          },
          {
            id: 7,
            order: 3,
          },
        ],
      },
      {
        id: 2,
        name: 'Code review',
        issues: [
          {
            id: 8,
            order: 1,
          },
        ],
      },
      {
        id: 3,
        name: 'Testing',
        issues: [
          {
            id: 9,
            order: 1,
          },
        ],
      },
      {
        id: 4,
        name: 'Done',
        issues: [],
      },
    ],
  },
];

/* eslint-disable */
const issuesData = [
  {
    id: 1,
    project: 'MP-1',
    name: 'Jira clone smth bug 1',
    // TODO: change status from string name to id number
    status: 'Backlog',
    type: 'task',
    key: 'MP-104',
    isDetails: true,
    // TODO: put out comment of other entity
    comments: [
      {
        id: 1,
        author: 'Vladimir',
        html: '<h1>I am comment!</h1> Helloy world!',
        created: '29, 2022, 19:37:1',
        updated: '29, 2022, 19:37:1',
      },
    ],
    priority: 'high',
    description: 'Helloy wolrder <h1>i am boss</h1>',
    assignees: [1, 3, 4, 5],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 2,
    project: 'MP-1',
    name: 'Vue jira spotify',
    status: 'In progress',
    type: 'bug',
    key: 'MP-234',
    isDetails: true,
    comments: [],
    priority: 'high',
    description: 'Helloy wolrder',
    assignees: [1, 2, 3],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 3,
    project: 'MP-1',
    name: 'Add storybook components',
    status: 'Code review',
    type: 'story',
    key: 'MP-22',
    isDetails: true,
    comments: [],
    priority: 'high',
    description: 'Helloy wolrder',
    assignees: [1, 4, 5],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 4,
    project: 'MP-1',
    name: 'Add jest tests',
    status: 'Testing',
    type: 'task',
    key: 'MP-521',
    isDetails: true,
    comments: [],
    priority: 'high',
    description: 'Helloy wolrder',
    assignees: [1, 5],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 5,
    project: 'MP-1',
    name: 'Logout (High)',
    status: 'Done',
    type: 'task',
    key: 'MP-35',
    isDetails: true,
    comments: [],
    priority: 'high',
    description: 'Helloy wolrder',
    assignees: [1, 4, 5],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 6,
    project: 'MP-1',
    name: 'Fix wysiwyg editor bugs',
    status: 'Backlog',
    type: 'task',
    key: 'MP-104',
    isDetails: true,
    comments: [],
    priority: 'high',
    description: 'Helloy wolrder',
    assignees: [1, 2, 3],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 7,
    project: 'MP-1',
    name: 'Update wysiwyg editor version',
    status: 'Done',
    type: 'bug',
    key: 'MP-234',
    isDetails: true,
    comments: [],
    priority: 'lowest',
    description: 'Helloy wolrder',
    assignees: [1, 4],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 8,
    project: 'MP-1',
    name: 'Helloy world',
    status: 'In progress',
    type: 'bug',
    key: 'MP-234',
    isDetails: true,
    comments: [],
    priority: 'low',
    description: 'Helloy wolrder',
    assignees: [1, 3],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
  {
    id: 9,
    project: 'MP-1',
    name: 'I am helloy world',
    status: 'In progress',
    type: 'bug',
    key: 'MP-235',
    isDetails: true,
    comments: [],
    priority: 'low',
    description: 'Helloy wolrder 2',
    assignees: [1, 3],
    reporters: [1],
    created: '28, 2022, 22:41:4',
    updated: '28, 2022, 22:41:4',
  },
];

const projectsData = [
  {
    id: 1,
    key: 'MP-1',
    name: 'Vue Jira Clone',
    category: 'Business',
    description: 'First test project',
    users: [1, 2, 3, 4, 5],
    totalIssues: 1,
    totalCompleteIssues: 0,
    priorities: ['highest', 'high', 'medium', 'low', 'lowest'],
    issues: [1, 2, 3, 4, 5, 6, 7, 8],
    // TODO: remove statuses property
    statuses: ['Backlog', 'In progress', 'Code review', 'Testing', 'Done'],
    board: 1,
  },
];

const usersData = [
  {
    id: 1,
    name: 'Vladimir',
    image: 'https://res.cloudinary.com/doqir4zpe/image/upload/v1677445292/1673000203649_wohcbd.jpg',
    projects: ['MP-1'],
  },
  {
    id: 2,
    name: 'Adam',
    image: 'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093406/ironman_c3jrbc_ej99co.jpg',
    projects: ['MP-1'],
  },
  {
    id: 3,
    name: 'Jason',
    image: 'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093431/captain_e8s9nk_dkwygr.jpg',
    projects: ['MP-1'],
  },
  {
    id: 4,
    name: 'Jake',
    image: 'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093445/thor_juqwzf_zzs70h.jpg',
    projects: ['MP-1'],
  },
  {
    id: 5,
    name: 'Laker',
    image: 'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093455/spiderman_zlrtx0_n9zxa0.jpg',
    projects: ['MP-1'],
  },
];

const recentIssuesData = {
  recentInProgress: [1, 2, 3, 4, 5, 6, 7, 8],
  toDo: [3, 4, 5, 6, 7, 8],
  viewed: [1, 3, 5, 7, 8],
};

export { usersData, projectsData, issuesData, recentIssuesData, projectsBoards };
