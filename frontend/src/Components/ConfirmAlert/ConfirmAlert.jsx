import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

export function ConfirmAlert({ question, infoMessage, confirm, cancel }) {
    return (
        <div className="modal-overlay">
            <div className="register-alert">
                <h3 className="size-4 bold text-warning-yellow">{question}</h3>
                {infoMessage && (<p className="size-3 text-warning-yellow">{infoMessage}</p>)}
                <button
                    className="street-blue-button m-1 m-top-2 width-content"
                    onClick={confirm}
                    title='Aceptar'
                >
                    <IoCheckmarkSharp />
                </button>
                {cancel && (
                    <button
                        className="rust-button m-1 m-top-2 width-content"
                        onClick={cancel}
                        title='Cancelar'
                    >
                        <IoCloseSharp />
                    </button>
                )}
            </div>
        </div>
    )
};