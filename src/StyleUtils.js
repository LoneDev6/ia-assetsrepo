import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const GrayText = withStyles({
    root: {
        color: "#666"
    }
})(Typography);
export default GrayText;