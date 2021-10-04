export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return <></>
  }

  return (
    <div
      className="fixed inset-0 z-40 overflow-auto flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done"
    >
      <div
        className="absolute w-full px-6 py-4  bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl appear-done enter-done"
        role="dialog"
      >
        <div
          data-focus-guard="true"
          tabIndex="0"
          style={{
            width: "1px",
            height: "0px",
            padding: "0px",
            overflow: "hidden",
            position: "fixed",
            top: "1px",
            left: "1px",
          }}
        ></div>
        <div
          data-focus-guard="true"
          tabIndex="1"
          style={{
            width: "1px",
            height: "0px",
            padding: "0px",
            overflow: "hidden",
            position: "fixed",
            top: "1px",
            left: "1px",
          }}
        ></div>
        <div data-focus-lock-disabled="false">
          <header className="flex justify-end">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
              aria-label="close"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </header>
          {children}
        </div>
        <div
          data-focus-guard="true"
          tabIndex="0"
          style={{
            width: "1px",
            height: "0px",
            padding: "0px",
            overflow: "hidden",
            position: "fixed",
            top: "1px",
            left: "1px",
          }}
        ></div>
      </div>
    </div>
  );
};

export const ModalHeader = ({ children, rest }) => {
  return (
    <p
      {...rest}
      className="mt-4 mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
    >
      {children}
    </p>
  );
};

export const ModalBody = ({ children, rest }) => {
  return (
    <div {...rest} className="mb-6 text-sm text-gray-700 dark:text-gray-400">
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, rest }) => {
  return (
    <footer
      {...rest}
      className="flex flex-col items-center px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
    >
      {children}
    </footer>
  );
};
