/**
 * Routes that render as a fully self-contained single page — no site
 * header/nav or footer, so a visitor can't navigate anywhere else from
 * here. Used by Header.tsx and Footer.tsx, which both hide themselves
 * when the current path is in this list.
 */
export const STANDALONE_ROUTES = ["/mobile"];
