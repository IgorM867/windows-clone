function AngleUp({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="size-4 rotate-45 border-l border-t translate-y-1/2 border-white brightness-75 hover:brightness-125"
      onClick={onClick}
    ></div>
  );
}

export default AngleUp;
