import { Label } from "@radix-ui/react-label";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  useActionData,
  useRouteLoaderData,
  type AppLoadContext,
} from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/profile";
import userController from "~/controllers/UsersController";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useNotification } from "~/contexts/NotificationContext";

export async function loader() {
  return {};
}

export async function action({ request, context }: Route.ActionArgs) {
  let formData = await request.formData();

  const userId = Number(formData.get("userId"));
  const name = formData.get("name") ? String(formData.get("name")) : undefined;
  const email = formData.get("email")
    ? String(formData.get("email"))
    : undefined;
  const profilePhoto = formData.get("profilePhoto")
    ? String(formData.get("profilePhoto"))
    : undefined;
  const biography = formData.get("biography")
    ? String(formData.get("biography"))
    : undefined;

  let result = await userController.updateUser(
    userId,
    {
      name,
      email,
      profile_photo_url: profilePhoto,
      bio: biography,
    },
    context
  );
  return { result };
}

export default function Profile() {
  const { showNotification } = useNotification();
  const { user } = useRouteLoaderData("protectedLayout");
  const [name, setName] = useState(user.name || "");
  const [profilePhoto, setProfilePhoto] = useState(
    user.profile_photo_url || ""
  );
  const [biography, setBiography] = useState(user.bio || "");
  const actionData = useActionData();

  // Store the ACTUAL actionData object, not just a boolean flag
  const processedActionDataRef = useRef(null);

  useEffect(() => {
    // Only process if there's actionData and it's a new one we haven't seen
    if (actionData?.result && actionData !== processedActionDataRef.current) {
      // Save the current actionData to avoid re-processing
      processedActionDataRef.current = actionData;

      if (actionData.result.success) {
        showNotification({
          type: "success",
          title: "Profile updated",
          message: "Your profile has been updated successfully!",
        });
      } else {
        showNotification({
          type: "error",
          title: "Update failed",
          message:
            actionData.result.message || "An error occurred during update.",
        });
      }
    }
  }, [actionData, showNotification]);

  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full">
      {actionData?.result && !actionData.result.success && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <Alert variant="destructive" className="shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {actionData.message || "An error occurred during signup."}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Form method="post" className="w-full max-w-md">
        <div className="grid p-10 gap-10 border-accent border-2 rounded-xl">
          <Input type="hidden" name="userId" value={user.id} />
          <div className="">
            <Label htmlFor="name" className="text-muted">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="email" className="text-muted">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="text"
              disabled
              value={user.email}
            />
            <input type="hidden" name="email" value={user.email} />
          </div>
          <div className="">
            <Label htmlFor="name" className="text-muted">
              Profile Photo url
            </Label>
            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="text"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="name" className="text-muted">
              Biography
            </Label>
            <Input
              id="biography"
              name="biography"
              type="text"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>
          <Button type="submit">Update Profile</Button>
        </div>
      </Form>
    </div>
  );
}
