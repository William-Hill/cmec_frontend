import json
import pandas as pd
# package for flattening json in pandas df
from pandas.io.json import json_normalize


MODEL_NAMES = [
    "bcc-csm1-1",
    "bcc-csm1-1-m",
    "CESM1-BGC",
    "GFDL-ESM2G",
    "inmcm4",
    "IPSL-CM5A-LR",
    "MIROC-ESM",
    "MPI-ESM-LR",
    "NorESM1-ME",
    "MeanCMIP5",
    "BCC-CSM2-MR",
    "BCC-ESM1",
    "CESM2",
    "CESM2-WACCM",
    "CNRM-CM6-1",
    "CNRM-ESM2-1",
    "E3SMv1-CTC",
    "GISS-E2-1-G",
    "GISS-E2-1-H",
    "IPSL-CM6A-LR",
    "MIROC6",
    "MRI-ESM2-0",
    "MeanCMIP6"
]


def load_json_data():
    # load json object
    with open('test.json') as scalar_json:
        scalar_data = json.load(scalar_json)
    return scalar_data


def reformat_json(scalar_data):
    metric_catalogues = scalar_data.keys()
    metric_catalogues_list = list(metric_catalogues)
    regions = set([x.split()[-1]
                   for x in scalar_data[metric_catalogues_list[0]].keys() if x != "children"])

    obj = {}
    for region in regions:
        obj[region] = {}
        for catalogue in metric_catalogues:
            score_dict = {key.rsplit(' ', 1)[0]: value for (
                key, value) in scalar_data[catalogue].items() if key != 'children' and region in key}
            for score, values in score_dict.items():
                score_dict[score] = {key: value for (
                    key, value) in zip(MODEL_NAMES, values)}
            metrics = scalar_data[catalogue]['children']
            metrics_obj = {}
            if metrics:
                for metric, value in metrics.items():
                    metric_score_dict = {key.rsplit(' ', 1)[0]: value for (
                        key, value) in value.items() if key != 'children' and region in key}
                    for score, values in metric_score_dict.items():
                        metric_score_dict[score] = {key: value for (
                            key, value) in zip(MODEL_NAMES, values)}
                    metrics_obj[metric] = {"scores": metric_score_dict}
                    observational_products = value['children']
                    if observational_products:
                        products_obj = {}
                        for product, product_value in observational_products.items():
                            product_score_dict = {key.rsplit(' ', 1)[0]: value for (
                                key, value) in product_value.items() if key != 'children' and region in key}
                            for score, values in product_score_dict.items():
                                product_score_dict[score] = {key: value for (
                                    key, value) in zip(MODEL_NAMES, values)}
                            products_obj[product] = {
                                "scores": product_score_dict}
                    metrics_obj[metric]["observational_products"] = products_obj
            obj[region][catalogue] = {
                "scores": score_dict, "metrics": metrics_obj}
    return obj


def write_json_file(obj):
    with open("data_file.json", "w") as write_file:
        json.dump(obj, write_file)


def main():
    scalar_data = load_json_data()
    obj = reformat_json(scalar_data)
    write_json_file(obj)


def extract_values(obj, key):
    """Recursively pull values of specified key from nested JSON."""
    arr = []

    def extract(obj, arr, key):
        """Return all matching values in an object."""
        if isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, (dict, list)):
                    extract(v, arr, key)
                elif k == key:
                    arr.append({k: v})
        elif isinstance(obj, list):
            for item in obj:
                extract(item, arr, key)
        return arr

    results = extract(obj, arr, key)
    return results


def get_all_scores_for_model_by_region(model, region):
    # load json object
    with open('data_file.json') as scalar_json:
        scalar_data = json.load(scalar_json)

    output = {}
    metric_catalogue = scalar_data[region]
    for catalogue in metric_catalogue:
        output[catalogue] = {}
        scores_obj = {}
        scores = scalar_data[region][catalogue]["scores"]
        for key, value in scores.items():
            scores_obj[key] = {model: value[model]}
        output[catalogue]["scores"] = scores_obj
        metrics = scalar_data[region][catalogue]['metrics']
        metrics_obj = {}
        if metrics:
            for metric, value in metrics.items():
                metrics_obj[metric] = {}
                for score, score_value in value['scores'].items():
                    metrics_obj[metric][score] = {model: score_value[model]}
            output[catalogue]["metrics"] = metrics_obj

    with open("ALL_SCORES_{}_{}.json".format(model, region), "w") as write_file:
        json.dump(output, write_file)


def get_catalogue_for_all_regions(metric_catalogue):
    # load json object
    with open('data_file.json') as scalar_json:
        scalar_data = json.load(scalar_json)

    regions = scalar_data.keys()

    output = {}

    for region in regions:
        output[region] = scalar_data[region][metric_catalogue]

    with open("ALL_REGIONS_{}.json".format(metric_catalogue), "w") as write_file:
        json.dump(output, write_file)


if __name__ == "__main__":
    # main()
    # get_catalogue_for_all_regions("Ecosystem and Carbon Cycle")
    get_all_scores_for_model_by_region("bcc-csm1-1", "southamericaamazon")

    # with open('data_file.json') as scalar_json:
    #     scalar_data = json.load(scalar_json)

    # values = extract_values(scalar_data, "inmcm4")
    # print(len(values))
    # print("values:", values)
