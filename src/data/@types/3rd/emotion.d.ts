import AppTheme from 'ui/themes/app-theme';
import AppThem from 'ui/themes/app-theme';

type PapperThemeType = typeof AppTheme;

declare module '@emotion/react' {
    export interface Theme extends PapperThemeType{}
}