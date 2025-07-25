import { IoCloseSharp } from "react-icons/io5";

export function PopupMessage({message, closeMessage}) {
    return (
        <div className="modal-overlay">
            <div className="register-alert">
                <h3 className="size-4 bold text-warning-yellow">{message}</h3>
                <button
                    className="rust-button m-1 m-top-2 width-content"
                    onClick={() => closeMessage(false)}
                    title='Cancelar'
                >
                    <IoCloseSharp />
                </button>
            </div>
        </div>
    )
}