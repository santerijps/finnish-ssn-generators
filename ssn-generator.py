from datetime import datetime
from random import randint


def new_date_zero_time(d: datetime = None) -> datetime:
  if d is None:
    d = datetime.now()
  return datetime(d.year, d.month, d.day, 0, 0, 0, 0)


def new_date_delta(d: datetime, year_delta = 0, month_delta = 0, day_delta = 0) -> datetime:
  d = datetime(d.year + year_delta, d.month + month_delta, d.day + day_delta)
  return d


def random_date(min_date: datetime, max_date: datetime) -> datetime:
  timestamp = randint(int(min_date.timestamp()), int(max_date.timestamp()))
  return new_date_zero_time(datetime.fromtimestamp(timestamp))


def random_date_from_age(years: int) -> datetime:
  min_date = new_date_delta(new_date_zero_time(), -(years + 1), 0, +1)
  max_date = new_date_delta(new_date_zero_time(), -years, 0, 0)
  return random_date(min_date, max_date)


def random_date_from_age_range(min_years: int, max_years: int) -> datetime:
  years = randint(min_years, max_years)
  return random_date_from_age(years)


def parse_date_short_format(d: datetime) -> str:
  return d.strftime("%d%m%y")


def get_delimiter(d: datetime) -> str:
  delimiters = {20: "A", 19: "-", 18: "+"}
  century = d.year // 100
  return delimiters[century]


def random_identity_number() -> str:
  n = randint(2, 899)
  return f"{n:03}"


def get_check_symbol(nine_digit_number: int) -> str:
  check_symbols = "0123456789ABCDEFHJKLMNPRSTUVWXY"
  return check_symbols[nine_digit_number % 31]


def generate_ssn_from_date(d: datetime) -> str:
  date_of_birth = parse_date_short_format(d)
  delimiter = get_delimiter(d)
  identity_number = random_identity_number()
  nine_digit_number = int(date_of_birth + identity_number)
  check_symbol = get_check_symbol(nine_digit_number)
  return (
    date_of_birth
    + delimiter
    + identity_number
    + check_symbol
  )


def generate_ssn_age_exactly(years: int) -> str:
  d = new_date_delta(new_date_zero_time(), -years, 0, 0)
  return generate_ssn_from_date(d)


def generate_ssn_age_one_day_shy_from(years: int) -> str:
  d = new_date_delta(new_date_zero_time(), -years, 0, +1)
  return generate_ssn_from_date(d)


def generate_ssn_age_one_day_over(years: int) -> str:
  d = new_date_delta(new_date_zero_time(), -years, 0, -1)
  return generate_ssn_from_date(d)


def generate_ssn_age_between(min_years: int, max_years: int) -> str:
  d = random_date_from_age_range(min_years, max_years)
  return generate_ssn_from_date(d)


class RandomSSN:

  @staticmethod
  def exactly(years: int) -> str:
    return generate_ssn_age_exactly(years)

  @staticmethod
  def almost(years: int) -> str:
    return generate_ssn_age_one_day_shy_from(years)

  @staticmethod
  def barely(years: int) -> str:
    return generate_ssn_age_one_day_over(years)

  @staticmethod
  def between(min_years: int, max_years: int) -> str:
    return generate_ssn_age_between(min_years, max_years)
