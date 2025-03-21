import { Label } from "@radix-ui/react-label";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/profile";
import { useState } from "react";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  console.log(formData);
  return {
    title: "Profile",
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  let user = {
    name: "User Name",
    email: "email",
    profilePhoto: "",
    biography: "",
  };

  return { user };
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const [name, setName] = useState(user.name);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);
  const [biography, setBiography] = useState(user.biography);
  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full">
      <Form method="post" className="w-full max-w-md">
        <div className="grid p-10 gap-10 border-accent border-2 rounded-xl">
          <div className="">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="name">Profile Photo url</Label>
            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="text"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="name">Biography</Label>
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
