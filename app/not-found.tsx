import NotFoundView from "./not-found-view";

export const metadata = {
  title: { absolute: "404 · Page not found" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
