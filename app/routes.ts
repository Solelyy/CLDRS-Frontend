import {flatRoutes } from "@react-router/fs-routes"
import {
  type RouteConfig,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
    layout("./routes/protected/layout.tsx", [
        layout("./routes/protected/lab-admin/layout.tsx", [
            route("lab-admin", "./routes/protected/lab-admin/admin-dashboard.tsx"),
            route("manage-assistants", "./routes/protected/lab-admin/manage-assistants.tsx"),
            route("manage-technicians", "./routes/protected/lab-admin/manage-technicians.tsx"),
            route("summary", "./routes/protected/lab-admin/summary.tsx"),
            route("damage-reports", "./routes/protected/lab-admin/damage-reports.tsx"),
            route("my-account", "./routes/protected/lab-admin/account.tsx"),
        ]),
        
        layout("./routes/protected/lab-assistant/layout.tsx", [
            route("lab-assistant", "./routes/protected/lab-assistant/dashboard.tsx"),
            route("my-account", "./routes/protected/lab-assistant/account.tsx"),
        ]), 
        
        layout("./routes/protected/lab-technician/layout.tsx", [
            route("lab-technician", "./routes/protected/lab-technician/dashboard.tsx"),
            route("my-account", "./routes/protected/lab-technician/account.tsx"),
        ]), 
    ]), 
    ...(await flatRoutes()),

] satisfies RouteConfig;
