"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ServerPage = async () => {
    const user = useCurrentUser();

    return (
        <UserInfo
        label="💻 Server component"
        user={user}
        />
     );
}
 
export default ServerPage;