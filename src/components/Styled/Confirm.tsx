import { createPortal } from "react-dom";
import { Button } from "./Button";
import { Box } from "./Box";

interface ConfirmProps {
    title?: string;
    content: string;
    cancelText?: string;
    confirmText?: string;
    onClose(): void;
    onClickConfirm(): void;
}
export const Confirm = ({ title, content, cancelText, confirmText, onClickConfirm, onClose }: ConfirmProps) => {

    return createPortal(<div className="confirmBg">
        <Box color="white" className="confirmContainer">
            {title && <title>{title}</title>}
            <span>{content}</span>
            <div>
                <Button className="confirm_cancel" onClick={onClose}>{cancelText || "취소"}</Button>
                <Button onClick={onClickConfirm}>{confirmText || "삭제"}</Button>
            </div>
        </Box>
    </div>, document.getElementById("root")!);
};