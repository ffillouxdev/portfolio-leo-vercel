import React, {useState, useEffect} from "react";
import {FaUserCircle, FaEdit} from "react-icons/fa";
import {signOut, useSession} from "next-auth/react";
import Button from "@/styles/Button.module.css";
import axios from "axios";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

interface FormData {
    nom: string;
    prenom: string;
    email: string;
    username: string;
    dateOfBirth: string;
}

const SectionProfile: React.FC = () => {
    const {data: session, update} = useSession();
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isClient, setIsClient] = useState<boolean>(false);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        nom: "",
        prenom: "",
        email: "",
        username: "",
        dateOfBirth: "",
    });

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        const sessionNeedsRefresh = Cookies.get("sessionNeedsRefresh");

        if (sessionNeedsRefresh && session) {
            update();
            Cookies.remove("sessionNeedsRefresh");
        }

        if (session) {
            setFormData({
                nom: session.user.lastName || "",
                prenom: session.user.firstName || "",
                email: session.user.email || "",
                username: session.user.name || "",
                dateOfBirth: session.user.dateOfBirth
                    ? new Date(session.user.dateOfBirth).toLocaleDateString()
                    : "",
            });
        }
    }, [session, update]);

    if (!isClient) {
        return null;
    }

    const handleEditClick = (field: string) => {
        setEditingField(field);
    };

    const handleSaveClick = async (field: string) => {
        setMessage("");
        setError("");

        try {
            const response = await axios.put("/api/user", {
                userId: session?.user?.id,
                updateData: {[field]: formData[field as keyof FormData]},
            });

            if (response.status === 200) {
                setMessage("Information mise à jour avec succès");
                setEditingField(null);

                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        [field]: formData[field as keyof FormData],
                    },
                });

                Cookies.set("sessionNeedsRefresh", "true");
            } else {
                setError("Échec de la mise à jour de l'information");
            }
        } catch (error) {
            setError("Échec de la mise à jour de l'information");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        router.push("/admin");
    };

    const handleDelete = async (userId: string) => {
        setMessage("");
        setError("");

        try {
            const response = await axios.delete("/api/user", {data: {userId}});
            if (response.status === 200) {
                setMessage("Utilisateur supprimé avec succès");
                signOut({callbackUrl: "/"});
            } else {
                setError("Échec de la suppression de l'utilisateur");
            }
        } catch (error) {
            setError("Échec de la suppression de l'utilisateur");
        }
    };

    return (
        <section
            className="min-h-screen flex flex-col justify-center text-center items-center w-full py-20 sm:py-0"
            style={{background: "url('/assets/image/background/fondEtoile.png') center center / cover no-repeat fixed"}}

        >
            <h2 className="text-6xl font-bold text-center mb-8 font-aquire">Profil</h2>
            <div
                className="shadow-2xl mx-5 lg:w-1/3 sm:w-1/2 rounded-lg p-8 bg-white bg-opacity-80 flex flex-col items-center">
                <div className="mb-8">
                    <FaUserCircle className="text-gray-700 w-36 h-36"/>
                </div>
                <div className="w-full text-center text-black">

                    <h3 className="text-center text-2xl font-semibold mb-4 font-aquire">Détails</h3>
                    <div className={"flex justify-center items-center w-full p-7 pt-2"}>
                        <hr className={"border-2 rounded-full border-black w-1/2"}/>
                    </div>
                    {["nom", "prenom", "username", "dateOfBirth", "email"].map((field) => (
                        <div key={field} className="mb-4 flex justify-between items-center">
                            <div>
                                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}: </strong>
                                {editingField === field ? (
                                    <input
                                        type={field === "dateOfBirth" ? "date" : "text"}
                                        name={field}
                                        value={formData[field as keyof FormData]}
                                        onChange={handleChange}
                                        className="mt-1 p-1 border-b-2 border-gray-300"
                                    />
                                ) : (
                                    <span>
                                        {field === "dateOfBirth" && formData[field]
                                            ? new Date(formData[field]).toLocaleDateString("fr-FR")
                                            : formData[field as keyof FormData]}
                                    </span>
                                )}
                            </div>
                            {editingField === field ? (
                                <button
                                    className="ml-2 text-green-500"
                                    onClick={() => handleSaveClick(field)}
                                    type="button"
                                >
                                    Enregistrer
                                </button>
                            ) : (
                                <FaEdit
                                    className="ml-2 text-gray-500 cursor-pointer"
                                    onClick={() => handleEditClick(field)}
                                />
                            )}
                        </div>
                    ))}

                    <div className="space-y-2 text-center justify-center items-center mt-8">
                        <div className={`flex flex-row space-x-4 justify-center items-center text-center`}>
                            <button
                                className={Button.customButton}
                                onClick={() => signOut({callbackUrl: "/"})}
                                type="button"
                            >
                                Se déconnecter
                            </button>
                            <button
                                className={Button.customButton}
                                onClick={() => handleDelete(session?.user?.id ?? "")}
                                type="button"
                            >
                                Supprimer le compte
                            </button>
                        </div>
                        {session?.user?.isAdmin ? (
                            <button
                                className={`${Button.customButton}`}
                                onClick={handleSubmit}
                                type="button"
                            >
                                Admin
                            </button>
                        ) : null}
                    </div>
                    {message && <p className="text-green-500 mt-4">{message}</p>}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </section>
    );
};

export default SectionProfile;
