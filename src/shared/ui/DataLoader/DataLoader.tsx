import {Spinner} from '@heroui/spinner';
import { useI18n } from "@/shared/i18n";

interface Props{
    label?: string
}

export function DataLoader({label} : Props){
    const { t } = useI18n();
    return <div className="w-full h-full p-20 flex justify-center items-center">
        <Spinner size='lg' color='primary' label={label ?? t("common.loading")}/>
    </div>
}
