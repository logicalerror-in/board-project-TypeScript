type MessageBoxProps = {
  message: string;
};

const MessageBox = ({message}: MessageBoxProps) => {
  if (message.length === 0) {
    return null;
  }

  return (
    <div className={'mb-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm'}>
      {message}
    </div>
  );
};

export default MessageBox;