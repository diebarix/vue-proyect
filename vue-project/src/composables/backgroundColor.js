//Por dentro los composables utilizan el composition api
import { computed } from "vue";

//Todos los composables que en react serian "hooks", deberian empezar con use
function useBackgroundColor(props) {
    return computed(() => {
        const options = {
                        danger: "var(--danger-color)",
                        info: "var(--info-color)",
                        warning: "var(--warning-color)",success: "var(--accent-color)",
                        secondary: "var(--secondary-color)",
                    }
    
                    return options[props.variant];
    })
}
//No hay un metodo establecido para reutilizar props, pero usamos este metodo
const BackgroundColorProps = {
    variant: {
        required: false,
        default: "success",
    //Restringo a ciertos valores esta propiedad
        validator(value) {
            const options = ["danger", "warning", "info", "success", "secondary"];

            return options.includes(value)
        }
    },
}

export {useBackgroundColor, BackgroundColorProps}