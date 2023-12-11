import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile(); // getting the current user

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  }); // if we have a profile we attempt to find the initial server that this user is in

  // we get a 404 because of the server that we created in the url with the id doesn't exist
  if (server) {
    return redirect(`/servers/${server.id}`);
  } // otherwise we redirect to the URL of that server

  return <InitialModal />; // if there is no server we return an initial modal to create one
};

export default SetupPage;
