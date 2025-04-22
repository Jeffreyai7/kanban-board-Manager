const Logo = () => {
  return (
    <div className="flex gap-1 items-center">
      <div className="flex gap-0.5 border border-secondary rounded p-1">
        <div className="h-4 w-1 bg-primary rounded-sm"></div>
        <div className="h-3 w-1 bg-primary rounded-sm"></div>
      </div>
      <p className="font-bold text-base tracking-wider">
        Task<span className="text-secondary uppercase">Craft</span>
      </p>
    </div>
  );
};

export default Logo;
