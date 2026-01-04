'use client';
import { authClient } from "@/app/lib/auth-client";
import { SUPPORTED_OAUTH_PROVIDERS, SUPPORTED_OAUTH_PROVIDERS_DETAILS, SupportedOAuthProvider } from "@/app/lib/supported-oauth-providers";
import { BetterAuthActionButton } from "@/app/components/auth/BetterAuthActionButton";

const SocialAuthButtons = () => {
    return (
        <>
            {SUPPORTED_OAUTH_PROVIDERS.map((provider: SupportedOAuthProvider) => {
                const Icon = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].Icon;
                const providerName = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name;

                return (
                    <BetterAuthActionButton
                        key={provider}
                        variant="soft"
                        action={() => authClient.signIn.social({ provider, callbackURL: '/' })}
                        errorMessage={`${providerName} Sign In Failed`}
                    >
                        <Icon />
                        {providerName}
                    </BetterAuthActionButton>
                );
            })}
        </>
    );
};

export default SocialAuthButtons;
