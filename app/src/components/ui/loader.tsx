export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin">
          <div className="h-full w-full rounded-[50%] border-8 border-t-primary border-l-primary border-r-primary-foreground border-b-primary-foreground"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-ping">
          <div className="h-full w-full rounded-[50%] border-8 border-primary opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
