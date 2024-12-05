// JavaScript source code
import infos from "./infos";
import SignInfo from "./SignInfo";

const infosList = infos.map((info, key) => {
    return <SignInfo  {...info} key={key} />
});
export default infosList;