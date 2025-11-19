const Message = ({ variant = 'info', children }) => {
  const variants = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} mb-4`}>
      {children}
    </div>
  );
};

export default Message;
