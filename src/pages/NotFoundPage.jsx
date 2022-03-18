import React from "react";
import BackHome from "../components/ui/BackHome/BackHome";

function NotFoundPage() {
    return (
        <div className="NotFoundPage">
            <h1>Page Not Found.</h1>
            <BackHome message="Go back to the home page and convert something." />
        </div>
    );
}

export default NotFoundPage;
