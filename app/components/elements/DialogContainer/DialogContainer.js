import { useAppContext } from "../../../context/state";
import CloseIcon from "@material-ui/icons/Close";
import Button from "./../Button/Button";
import moment from "moment";

export default function DialogContainer() {
  const global = useAppContext();

  const closeDialog = () => {
    global.methods.setState(false);
  };
  return (
    <div
      className={
        "fixed z-50 inset-0 w-full h-full bg-gray-900 bg-opacity-75 transition-opacity duration-500 flex items-center " +
        (global.sharedState.dialog.state == "closed"
          ? "invisible opacity-0"
          : "visible opacity-100")
      }
    >
      <div className="container mx-auto">
        <div className="w-1/2 bg-white mx-auto rounded-md shadow-md">
          <div className="w-full bg-gray-200 flex rounded-t-md">
            <div className="flex-auto  py-4 px-4">
              {global.sharedState.dialog.title}
            </div>
            <div className="p-4 cursor-pointer" onClick={() => closeDialog()}>
              <CloseIcon />
            </div>
          </div>

          <div className="p-4">{global.sharedState.dialog.content}</div>
        </div>
      </div>
    </div>
  );
}
