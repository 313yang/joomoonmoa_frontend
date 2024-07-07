import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Popup = ({ children, onClose }: PropsWithChildren<{ onClose: () => void; }>) => {
    return createPortal(<div className="popup_container"  onClick={onClose}>
        <div className="popup_main">
            {children}
        </div>
    </div>,document.getElementById("root")!);
};