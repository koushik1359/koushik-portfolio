import azure.functions as func
from src.main import app as fastapi_app

# Using the FunctionApp decorator for better routing control in Azure Static Web Apps
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="{*route}", methods=["GET", "POST", "OPTIONS"])
@app.asgi_app(app=fastapi_app)
def main(req: func.HttpRequest, context: func.Context) -> func.HttpResponse:
    return app.handle(req, context)
