import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-6">Page not found.</p>
      <Link to="/">
          <Button variant="secondary">Go Back Home</Button>
      </Link>
    </div>
  );
}