import azure.functions as func
from src.main import app as fastapi_app

# Seamlessly wrap the FastAPI app for Azure Functions (Consumption/Zero-Dollar)
# This allows the same API logic to run both locally and in the cloud.
app = func.AsgiFunctionApp(
    app=fastapi_app, 
    http_auth_level=func.AuthLevel.ANONYMOUS
)
