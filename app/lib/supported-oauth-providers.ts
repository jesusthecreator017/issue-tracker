import { ElementType, ComponentProps } from "react";
import { GoogleIcon, GitHubIcon } from "../components/auth/o-auth-icons";

export const SUPPORTED_OAUTH_PROVIDERS = ['google', 'github'] as const;
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDERS_DETAILS: Record<
    SupportedOAuthProvider, { name: string; Icon: ElementType<ComponentProps<'svg'>> }
> = {
    google: { name: 'Google', Icon: GoogleIcon },
    github: { name: 'GitHub', Icon: GitHubIcon },
}