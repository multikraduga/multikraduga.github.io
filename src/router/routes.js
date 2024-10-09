const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "request",
        component: () => import("pages/RequestPage.vue"),
        name: "Request",
      },
      {
        path: "request/:id",
        name: "ReqDetails",
        component: () => import("pages/ReqDetails.vue"),
        props: true,
      },
      {
        path: "account",
        name: "Account",
        component: () => import("pages/AccountPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorNotFound",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
