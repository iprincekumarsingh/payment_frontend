import Cookie from "js-cookie";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    // <div id="error-page">
    <div className="py-10">
      <div className="text-center">
        <p className="text-4xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900  sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          Sorry, we couldn&amp;apos:t find the page you're looking for.
        </p>
        <div className="flex items-center justify-center mt-6">
          {Cookie.get("token") ? (
            <Link
              to={`home/home/user`}
              className="inline-block rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
              Go Home
            </Link>
          ) : (
            <Link
              to={`auth/login`}
              className="inline-block rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
