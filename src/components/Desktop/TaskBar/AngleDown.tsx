function AngleDown({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="size-4 rotate-45 border-r border-b border-white brightness-75 hover:brightness-125"
      onClick={onClick}
    ></div>
  );
}

export default AngleDown;
