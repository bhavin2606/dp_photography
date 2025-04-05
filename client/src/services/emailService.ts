const EMAIL_API = import.meta.env.VITE_API_BASE_URL + "/email/send";

export const sendEmailApi = async ({
    to,
    subject,
    message,
}: {
    to: string;
    subject: string;
    message: string;
}) => {
    const res = await fetch(EMAIL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, message }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to send email");
    }

    return await res.json();
};
