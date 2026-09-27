import sys
import urllib.request
import urllib.error
import json

def trigger_render_deployment():

    render_api_key = "rnd_2QjkeBLN6VMwdDfsWfK4fSW1gEei"
    service_id = "srv-d8qfi2sm0tmc73a8o26g"

    url = f"https://api.render.com/v1/services/{service_id}/deploys"

    print("🚀 Iniciando deploy en Render...")
    print("🌐 https://tutawayta-latest.onrender.com")

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps({}).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {render_api_key}",
                "Content-Type": "application/json"
            },
            method="POST"
        )

        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode("utf-8"))
            print("✅ DEPLOY INICIADO CON ÉXITO")
            print("ID:", data.get("id"))

    except urllib.error.HTTPError as e:
        print(f"❌ ERROR EN RENDER: {e.code} - {e.reason}")
        print(e.read().decode())

    except urllib.error.URLError as e:
        print(f"❌ ERROR DE RED: {e.reason}")

if __name__ == "__main__":
    trigger_render_deployment()