import {colors, fonts, padding, dimensions} from '../style/base'

const panelStyles = StyleSheet.create({
    container: {
        paddingHorizontal: padding.sm,
        paddingVertical: padding.lg,
        width: dimensions.fullWidth
    },
    header: {
        fontSize: fonts.lg,
        fontFamily: fonts.primary
    },
    section: {
        paddingVertical: padding.lg,
        paddingHorizontal: padding.xl
    }
});

export default panelStyles