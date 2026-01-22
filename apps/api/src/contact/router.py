from fastapi import APIRouter

from .schemas import ContactRequest, ContactResponse

router = APIRouter()


@router.post("", response_model=ContactResponse)
async def submit_contact(data: ContactRequest):
    # TODO: Implement email sending with Resend or SMTP
    # For now, just log and return success
    print(f"Contact form submission: {data.name} <{data.email}>")
    print(f"Message: {data.message}")

    return ContactResponse(
        success=True,
        message="Thank you for your message! I'll get back to you soon.",
    )
