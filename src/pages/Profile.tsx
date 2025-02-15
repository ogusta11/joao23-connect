
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: localStorage.getItem("username") || "",
    bio: localStorage.getItem("bio") || "",
    photoUrl: localStorage.getItem("photoUrl") || "/placeholder.svg",
    followers: parseInt(localStorage.getItem("followers") || "0"),
  });

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVerified(profile.username.toLowerCase() === "ogusta");
  }, [profile.username]);

  const handleSave = () => {
    localStorage.setItem("username", profile.username);
    localStorage.setItem("bio", profile.bio);
    localStorage.setItem("photoUrl", profile.photoUrl);
    localStorage.setItem("followers", profile.followers.toString());
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          <img
            src={profile.photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            +
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome de usuário</label>
          <div className="flex items-center space-x-2">
            <Input
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              placeholder="Seu nome de usuário"
            />
            {isVerified && (
              <Badge variant="default" className="bg-blue-500">
                <Check className="w-4 h-4" />
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Biografia</label>
          <Textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Conte um pouco sobre você"
            className="resize-none"
          />
        </div>

        <div className="text-sm text-gray-600">
          {profile.followers} seguidores
        </div>

        <Button onClick={handleSave} className="w-full">
          Salvar Perfil
        </Button>
      </div>
    </div>
  );
};

export default Profile;
