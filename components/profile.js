import {
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Profile() {
const { isConnected } = useAccount();
  if (isConnected) {
    return (
      <div class="flex items-center justify-center mt-4">
        <ConnectButton />
      </div>
    );
  }
}
