import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);
        const decodeToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodeToken?.name;
        const identity = decodeToken.jti;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
