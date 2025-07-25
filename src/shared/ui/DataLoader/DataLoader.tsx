import { CircularProgress } from "@mui/material";
import styles from "./DataLoader.module.css";

export function DataLoader(){
    return <div className={styles.data_loader_container}>
        <CircularProgress/>
    </div>
}