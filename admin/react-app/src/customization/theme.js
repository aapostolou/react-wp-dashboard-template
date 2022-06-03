import { createTheme } from "@mui/material";
import { merge } from "lodash";

export const useTheme = (theme = {}) => createTheme(merge({}, theme));
