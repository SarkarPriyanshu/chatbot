from setuptools import setup, find_packages

with open("requirements.in") as f:
    requirements = f.read().splitlines()

setup(
    name="chatbot-agent",
    packages=find_packages(include=["app", "app.*"]),  # automatically include app and subpackages
    author="priyanshu",
    version="0.0.1",  # remove leading "v"
    install_requires=requirements,
)