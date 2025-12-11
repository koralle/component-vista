import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signOut } = authClient;
  const navigate = useNavigate();

  const onClick = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/sign-in" });
        },
      },
    });
  };

  return (
    <div>
      <div>
        <h1>Component Vista Admin</h1>

        <button type="button" onClick={onClick}>
          Sign Out
        </button>
      </div>
      <Outlet />
    </div>
  );
}
