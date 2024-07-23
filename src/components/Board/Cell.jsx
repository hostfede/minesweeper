import './cell.scss';

function Cell({
  isMined,
  isHidden,
  isFlagged,
  minesAround,
  onClick,
  onRightClick,
}) {
  let value;
  let className = 'cell';

  if (isHidden) {
    className += ' hidden';
    value = isFlagged ? '🚩' : '';
  } else {
    className += ' revealed';
    if (isMined) {
      className += ' mined';
      value = '💣';
    } else {
      className += ` mines-around-${minesAround}`;
      value = minesAround || '';
    }
  }

  return (
    <button
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault();
        onRightClick();
      }}
      disabled={!isHidden || isFlagged}
    >
      <div className={className}>{value}</div>
    </button>
  );
}

export default Cell;
